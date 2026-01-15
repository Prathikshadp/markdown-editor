export interface Document {
  id: number;
  name: string;
  markdownContent: string;
  createdAt: Date;
}

export interface CreateDocumentRequest {
  name: string;
  markdown: string;
}

export interface CreateDocumentResponse {
  message: string;
  document: Document;
}
