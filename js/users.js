// users.js - Inițializare utilizatori pentru sistemul de pontaj

// Lista inițială de utilizatori
const INITIAL_USERS = [
  {
    name: "Marius", 
    id: "138", 
    grade: "Director",
    pin: "1901"
  },
  {
    name: "Maria Ionescu", 
    id: "002", 
    grade: "Vice-Director",
    pin: "5678"
  },
  {
    name: "Miruna", 
    id: "655", 
    grade: "Sef Spital"
  },
  {
    name: "Elena Gheorghe", 
    id: "004", 
    grade: "Responsabil Activitate"
  },
  {
    name: "Mihai Stanescu", 
    id: "005", 
    grade: "Medic Sef"
  },
  {
    name: "Ana Dumitru", 
    id: "006", 
    grade: "Medic Specialist"
  },
  {
    name: "Cristian Matei", 
    id: "007", 
    grade: "Medic Rezident"
  },
  {
    name: "Roxana Popa", 
    id: "008", 
    grade: "Paramedic Sef"
  },
  {
    name: "Gabriel Radu", 
    id: "009", 
    grade: "Paramedic"
  },
  {
    name: "Ioana Marinescu", 
    id: "010", 
    grade: "Asistent Sef"
  },
  {
    name: "Florin Nistor", 
    id: "011", 
    grade: "Asistent Avansat"
  },
  {
    name: "Carmen Diaconu", 
    id: "012", 
    grade: "Asistent"
  }
];

// Funcție pentru inițializarea utilizatorilor
function initializeUsers() {
  const LS_PERSONS = 'pf_persons';
  
  // Verifică dacă există deja utilizatori în localStorage
  const existingPersons = localStorage.getItem(LS_PERSONS);
  
  if (!existingPersons || JSON.parse(existingPersons).length === 0) {
    // Nu există utilizatori, inițializează cu lista default
    localStorage.setItem(LS_PERSONS, JSON.stringify(INITIAL_USERS));
    console.log('✅ Utilizatori inițializați cu succes!');
    console.log(`📊 Au fost adăugați ${INITIAL_USERS.length} utilizatori:`);
    
    INITIAL_USERS.forEach(user => {
      console.log(`👤 ${user.name} (${user.id}) - ${user.grade}${user.pin ? ' [PIN: ' + user.pin + ']' : ''}`);
    });
    
    return true;
  } else {
    const persons = JSON.parse(existingPersons);
    console.log(`ℹ️ Există deja ${persons.length} utilizatori în sistem.`);
    return false;
  }
}

// Funcție pentru resetarea utilizatorilor (folosește cu atenție!)
function resetUsers() {
  if (confirm('⚠️ ATENȚIE! Aceasta va șterge TOȚI utilizatorii existenți și va reinițializa cu lista default. Continui?')) {
    const LS_PERSONS = 'pf_persons';
    localStorage.setItem(LS_PERSONS, JSON.stringify(INITIAL_USERS));
    console.log('🔄 Utilizatori resetați cu succes!');
    return true;
  }
  return false;
}

// Funcție pentru adăugarea unui utilizator programatic
function addUser(name, id, grade, pin = null) {
  const LS_PERSONS = 'pf_persons';
  const persons = JSON.parse(localStorage.getItem(LS_PERSONS) || '[]');
  
  // Verifică dacă utilizatorul există deja
  const exists = persons.find(p => p.id === id && p.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    console.log(`❌ Utilizatorul ${name} (${id}) există deja!`);
    return false;
  }
  
  // Adaugă utilizatorul
  const newUser = { name, id, grade };
  if (pin && (grade === 'Director' || grade === 'Vice-Director')) {
    newUser.pin = pin;
  }
  
  persons.push(newUser);
  localStorage.setItem(LS_PERSONS, JSON.stringify(persons));
  
  console.log(`✅ Utilizator adăugat: ${name} (${id}) - ${grade}`);
  return true;
}

// Funcție pentru listarea utilizatorilor existenți
function listUsers() {
  const LS_PERSONS = 'pf_persons';
  const persons = JSON.parse(localStorage.getItem(LS_PERSONS) || '[]');
  
  if (persons.length === 0) {
    console.log('📭 Nu există utilizatori în sistem.');
    return;
  }
  
  console.log(`📋 Lista utilizatori (${persons.length}):`);
  persons.forEach((user, index) => {
    console.log(`${index + 1}. 👤 ${user.name} (${user.id}) - ${user.grade}${user.pin ? ' [PIN: ' + user.pin + ']' : ''}`);
  });
}

// Auto-inițializare la încărcarea paginii (opțional)
document.addEventListener('DOMContentLoaded', function() {
  // Decomentează linia de mai jos dacă vrei inițializare automată
  // initializeUsers();
});

// Expune funcțiile în obiectul global pentru uz în consolă
window.UserManager = {
  init: initializeUsers,
  reset: resetUsers,
  add: addUser,
  list: listUsers

};
