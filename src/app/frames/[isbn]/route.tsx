import { NextRequest } from "next/server";
import { frames } from "../frames";
<<<<<<< HEAD
import { getBook } from "@/utils/get-book";
=======
import { getBook } from "@/app/utils/get-book";
>>>>>>> main

export async function GET(
  request: NextRequest,
  { params }: { params: { isbn: number } }
) {

  const book = getBook(params.isbn);
  
  const handleRequest = frames(async () => {
    return {
      image: (
        <div
          style={{
            height: '400px',
            width: '800px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f8f8f8',
            fontSize: 24,
            fontWeight: 500,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: '40%',
              backgroundColor: '#e0e0e0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 8,
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              overflow: 'hidden',
            }}
          >
            <img
              src={book.cover_image_url}
              alt="Image Description"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          <div style={{ marginLeft: 20, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '50%', paddingRight: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              4.5
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#f0b900"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: 5 }}
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#f0b900"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#f0b900"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#f0b900"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="#ccc"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span style={{ marginLeft: 5, color: '#666' }}>(235)</span>
            </div>
            <div style={{ marginTop: 10, color: '#333', wordBreak: 'break-word', fontSize: "32px" }}>
              {book.title}
            </div>
            <div style={{ marginTop: 10, color: '#333', wordBreak: 'break-word', fontSize: "24px" }}>
              {book.subtitle}
            </div>
          </div>
        </div>  
      ),
    };
  });
  return handleRequest(request);
}
