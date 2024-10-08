// Firebase konfiguracija (zamijeni svojim podacima iz Firebase konzole)
var firebaseConfig = {
    apiKey: "AIzaSyCIPKzSJ2furGV5BBHqvxE2KS5I8R2of_E",
    authDomain: "kongres-app.firebaseapp.com",
    projectId: "kongres-app",
    storageBucket: "kongres-app.appspot.com",
    messagingSenderId: "965427055352",
    appId: "1:965427055352:web:f7ec9b7e49803940f5890d"
  };
  
  // Inicijalizacija Firebase-a
  firebase.initializeApp(firebaseConfig);
  
  // Inicijaliziraj Firestore bazu podataka
  var db = firebase.firestore();
  
  // Dohvati događaje iz Firestore-a i prikaži ih na stranici
  db.collection("events").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          const eventData = doc.data();
          createEventElement(eventData);
      });
  });
  
  // Funkcija za stvaranje HTML elemenata događaja
  function createEventElement(eventData) {
      const eventContainer = document.createElement('div');
      eventContainer.classList.add('event-card');
      eventContainer.onclick = () => showDetails(eventData.title);
  
      eventContainer.innerHTML = `
          <div class="event-time">
              <p>${eventData.time.split(" - ")[0]}</p>
              <p>${eventData.time.split(" - ")[1]}</p>
          </div>
          <div class="event-content">
              <h3>${eventData.title}</h3>
              <p class="speaker">${eventData.speaker}</p>
              <p class="location">Lokacija: ${eventData.location}</p>
          </div>
          <div class="event-arrow">
              <span>&#x25BA;</span>
          </div>
      `;
  
      document.querySelector('.schedule-container').appendChild(eventContainer);
  }
  
  // Funkcija za prikazivanje detalja događaja u modal prozoru
  function showDetails(eventTitle) {
      db.collection("events").where("title", "==", eventTitle).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              const eventData = doc.data();
              
              // Postavi podatke u modal
              document.getElementById('modal-title').textContent = eventData.title;
              document.getElementById('modal-speaker').textContent = `Predavač: ${eventData.speaker}`;
              document.getElementById('modal-time').textContent = `Vrijeme: ${eventData.time}`;
              document.getElementById('modal-location').textContent = `Lokacija: ${eventData.location}`;
              document.getElementById('modal-description').textContent = eventData.description;
      
              // Pokaži modal
              document.getElementById('details-modal').classList.remove('hidden');
          });
      });
  }
  
  // Funkcija za zatvaranje modal prozora
  function closeModal() {
      document.getElementById('details-modal').classList.add('hidden');
  }
  