import { openai } from "@ai-sdk/openai"
import { streamText, embed } from "ai"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!)

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Function to search knowledge base using embeddings
async function searchKnowledgeBase(query: string, limit = 5) {
  try {
    // 1. Convert query to embedding
    const { embedding } = await embed({
      model: openai.embedding("text-embedding-3-small"),
      value: query,
    })

    // 2. Search for similar content in database
    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: 0.7, // Minimum similarity score
      match_count: limit,
    })

    if (error) {
      console.error("Database search error:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Knowledge base search error:", error)
    return []
  }
}

export async function POST(req: Request) {
  const { messages } = await req.json()
  const lastMessage = messages[messages.length - 1]

  try {
    // 3. Retrieve relevant context
    const relevantDocs = await searchKnowledgeBase(lastMessage.content)

    // 4. Build context from retrieved documents
    const context = relevantDocs.map((doc) => `Source: ${doc.source}\nContent: ${doc.content}`).join("\n\n")

    // 5. Generate response with context
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: `You are ATU Assistant for Accra Technical University.

Use the following context to answer questions accurately. If the context doesn't contain relevant information, say so and provide general guidance.

RETRIEVED CONTEXT:
${context}

Always cite your sources when using specific information from the context.`,
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("RAG chat error:", error)

    // Fallback to basic response
    const result = streamText({
      model: openai("gpt-4o-mini"),
      system: "You are ATU Assistant. Provide helpful information about Accra Technical University.",
      messages,
    })

    return result.toDataStreamResponse()
  }
}
