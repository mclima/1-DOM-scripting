// Functional vs Imperative Programming
// https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript

const intro = [
  "spensercanderson@gmail.com",
  "cynthiacaban@yahoo.com",
  "eltonceze@gmail.com",
  "chrismagnemi@gmail.com",
  "brianmcnulty17@gmail.com",
  "nikita.shaiva@yahoo.com",
  "dwhitney@stern.nyu.edu",
  "lyy203@nyu.edu",
];

const intermediate = [
  "spensercanderson@gmail.com",
  "eltonceze@gmail.com",
  "charlosgary@gmail.com",
  "ki575@nyu.edu",
  "brianmcnulty17@gmail.com",
  "nychansu@gmail.com",
  "dwhitney@stern.nyu.edu",
  "lyy203@nyu.edu",
];

// imperative example
function getContinuingStudents(intro, intermediate) {
  let continuing = [];

  for (let i = 0; i < intro.length; i++) {
    for (let j = 0; j < intermediate.length; j++) {
      if (intro[i] === intermediate[j]) {
        continuing.push(intro[i]);
      }
    }
  }
  return continuing;
}

getContinuingStudents(intro, intermediate); //?

// let continuingStudents = intro.filter(function (student) {
//   return intermediate.includes(student);
// });

// let continuingStudents = intro.filter(student => intermediate.includes(student));

// let nonContinuingStudents = intro.filter(student => !intermediate.includes(student));

// let uniqueStudents = intro.filter(student => intermediate.includes(student));

// console.log(continuingStudents);
// console.log(nonContinuingStudents);
// console.log(uniqueStudents);
