-- Enable the pgvector extension for similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create table for storing knowledge base documents
CREATE TABLE university_knowledge (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  source VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  embedding vector(1536), -- OpenAI embedding dimension
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for fast similarity search
CREATE INDEX ON university_knowledge USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Function to search for similar documents
CREATE OR REPLACE FUNCTION match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id int,
  content text,
  source varchar,
  category varchar,
  similarity float
)
LANGUAGE SQL STABLE
AS $$
  SELECT
    university_knowledge.id,
    university_knowledge.content,
    university_knowledge.source,
    university_knowledge.category,
    1 - (university_knowledge.embedding <=> query_embedding) as similarity
  FROM university_knowledge
  WHERE 1 - (university_knowledge.embedding <=> query_embedding) > match_threshold
  ORDER BY university_knowledge.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Insert sample knowledge base data
INSERT INTO university_knowledge (content, source, category) VALUES
('HND Computer Science is a 2-3 year program covering programming, databases, networks, and software development. Students learn Python, Java, C++, and web technologies.', 'Academic Catalog', 'Programs'),
('BTech Computer Science is a 4-year degree program with advanced topics in AI, machine learning, cybersecurity, and software engineering.', 'Academic Catalog', 'Programs'),
('Admission requirements for HND programs include WASSCE/SSSCE with credits in English, Mathematics, and Science subjects.', 'Admissions Office', 'Requirements'),
('Tuition fees for HND programs range from GHS 3,000 to 4,500 per year, while BTech programs cost GHS 4,000 to 6,000 per year.', 'Finance Office', 'Fees'),
('The Computer Science department has modern labs with 200+ workstations, high-speed internet, and specialized software for programming and cybersecurity.', 'Facilities Management', 'Infrastructure');
