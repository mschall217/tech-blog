async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  console.log(title)
  const postBody = document.querySelector('#postBody').value;
  console.log(postBody)

  const response = await fetch(`/api/post`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      postBody
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);