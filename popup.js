const addressSubmit = document.getElementById('addressSubmit');

addressSubmit.addEventListener('click', async function() {
  const address = document.getElementById('address');
  const location = address.value;
  const town = location.split(',')[0];
  const randomNum = Math.ceil(Math.random() * 50);
  var lat, long, videos;

  await fetch(
    `http://open.mapquestapi.com/geocoding/v1/address?key=BGEiXmF2CNgWjtJUKgb2Tbv6yQClh0EH&location=${location}`
  )
    .then(response => response.json())
    .then(response => {
      lat = response.results[0].locations[0].latLng.lat;
      long = response.results[0].locations[0].latLng.lng;
    });

  await fetch(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&location=${lat}%2C%20${long}&locationRadius=5km&maxResults=50&q=${town}&type=video&key=AIzaSyBi3F8awhualQdnsvRm7Y0A3sJN1LabhEY`
  )
    .then(response => response.json())
    .then(response => (videos = response.items));

  chrome.tabs.create({
    url: `https://www.youtube.com/watch?v=${videos[randomNum].id.videoId}`
  });
});
