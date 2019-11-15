const addressSubmit = document.getElementById('addressSubmit');

addressSubmit.addEventListener('click', async function() {
  const address = document.getElementById('address');
  const location = address.value.replace(/\s/g, '');
  const splitTown = location.split(',')[0];
  const spacedTown = splitTown.replace(/([a-z])([A-Z])/g, '$1 $2');
  const parsedTown = spacedTown.replace(/\s/g, '%20');
  let lat, long, videos;

  await fetch(
    `https://us1.locationiq.com/v1/search.php?key=683f12733c5177&q=${parsedTown}&format=json`
  )
    .then(response => response.json())
    .then(response => {
      lat = response[0].lat;
      long = response[0].lon;
    });

  await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&location=${lat}%2C%20${long}&locationRadius=5km&maxResults=50&q=${parsedTown}&type=video&key=AIzaSyBi3F8awhualQdnsvRm7Y0A3sJN1LabhEY`
  )
    .then(response => response.json())
    .then(response => (videos = response.items));

  const randomNum = Math.floor(Math.random() * videos.length);

  chrome.tabs.create({
    url: `https://www.youtube.com/watch?v=${videos[randomNum].id.videoId}`
  });
});
