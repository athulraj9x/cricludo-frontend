export async function fetcher(url: string, options: RequestInit = {}) {
  const res = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  }); 


  return res.json();
}

export async function PostRequest(url: string, { arg }: { arg: any }) {
  return fetcher(url, {
    method: "POST",
    body: JSON.stringify(arg),
  });
}

export async function GetRequest(url: string) {
  return fetcher(url, {
    method: "GET",
  });
}

export async function DeleteRequest(url: string) {
  return fetcher(url, {
    method: "DELETE",
  });
}

export async function PutRequest(url: string, { arg }: { arg: any }) {
  return fetcher(url, {
    method: "PUT",
    body: JSON.stringify(arg),
  });
}
