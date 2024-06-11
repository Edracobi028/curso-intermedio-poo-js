
/* 

//convertir a string el obj1
const stringifiedComplexObj = JSON.stringify(obj1);

//Crea un objeto a partir de un string 
const obj2 = JSON.parse(stringifiedComplexObj); 

*/


//Ciclo rrecorrer cada una de las propiedades y guardarlas en el obj1
/* 
const obj2 = {};
for (prop in obj1) {
    obj2[prop] = obj1[prop];
} 
*/


//copiar un objeto con Shallow   assign y create
/* 
const obj2 = {};
const obj3 = Object.assign({}, obj1); //Solo indicamos el objeto y asigna las propiedades del objeto.
const obj4 = Object.create(obj1); //Solo indicamos el objeto y el lo va a crear
 */

//metodo estatico del prototipo Json que nos permite convertir objetos en un string cada propiedad y valor 



//RECURSIVIDAD

//EstructuraValidación
// function recursiva() {
//     if(/* validacion*/){
//         //llamados recursivos
//     } else {
//         //llamados normales, sin recursividad
//     }
// }

//Ejemplo de recursividad manual

//const numeritos = [0,1,2,3,4,5,6,7,8,9,435678,7,2,3];
/* 
//Obtener los numeros con un for
let numerito = 0;
for(let index = 0; index < numeritos.length; index++){
    numerito = numeritos[index];
    console.log({index, numerito});
} 
*/

//Ejemplo de recursividad 
function recursiva(numbersArray) {
    if (numbersArray.length != 0) {
        const firstNum = numbersArray[0]; //indicar que es la 1ra posicion
        console.log(firstNum);
        numbersArray.shift(); //eliminar el 1er elemento
        return recursiva(numbersArray); //enviamos el array de numeros sin el numero que le quitamos
    } else {

    }
}

//funcion validar si es un objeto o un array
function isObject(subject) {
    return typeof subject == "object"; //true si es objeto
}

function isArray(subject) {
    return Array.isArray(subject); //true si es array
}

//Recibe el objeto que copiar
function deepCopy(subject) {
    let copySubject; //inicializaar

    //validamos
    const subjectIsObject = isObject(subject);
    const subjectIsArray = isArray(subject);

    //Asignar segun el tipo
    if (subjectIsArray) {
        copySubject = [];
    } else if (subjectIsObject) {
        copySubject = {};
    } else {
        return subject;
    }

    //for

    for (key in subject) {
        //Validar si cada propiedad es un objeto o array
        const keyIsObject = isObject(subject[key]);

        if (keyIsObject) { //Si es un objeto
            copySubject[key] = deepCopy(subject[key]); //aplicamos recursividad
        } else {

            if (subjectIsArray) { //Si es un array el objeto principal agregaremos cada propiedad que vamos leyendo
                copySubject.push(subject[key]);
            } else {
                copySubject[key] = subject[key] //la propiedad sera igual a la original
            }
        }
    }

    return copySubject; //devolver
}


//Crear metodos estaticos desde un prototipo
function SuperObject() { }

SuperObject.isObject = function (subject) {
    return typeof subject == "object"; //true si es objeto
}

// Llamar a Super object y directamente el metodo estatico que queremos crear
// no estamos guardando esa func dentro de nuestro prototype sino directamente en superobject
// aqui pondremos los metodos que consideremos relevantes en el dia a dia
SuperObject.deepCopy = function (subject) {

    let copySubject; //inicializaar

    //validamos
    const subjectIsObject = isObject(subject);
    const subjectIsArray = isArray(subject);

    //Asignar segun el tipo
    if (subjectIsArray) {
        copySubject = [];
    } else if (subjectIsObject) {
        copySubject = {};
    } else {
        return subject;
    }

    //for

    for (key in subject) {
        //Validar si cada propiedad es un objeto o array
        const keyIsObject = isObject(subject[key]);

        if (keyIsObject) { //Si es un objeto
            copySubject[key] = deepCopy(subject[key]); //aplicamos recursividad
        } else {

            if (subjectIsArray) { //Si es un array el objeto principal agregaremos cada propiedad que vamos leyendo
                copySubject.push(subject[key]);
            } else {
                copySubject[key] = subject[key] //la propiedad sera igual a la original
            }
        }
    }

    return copySubject; //devolver
}


//Playgrounds: Hacer freeze de un objeto de forma recursiva
/*
function deepFreeze(subject) {

    if (typeof subject !== 'object') {
        return subject;
    }
    Object.freeze(subject);

    for (key in subject) {//Validar si cada propiedad es un objeto o array
        deepFreeze(subject[key]); //aplicamos recursividad
    }


    //Object.freeze(copySubject); //freeze al objeto

    return subject;
}
*/


//FACTORY PATTERNS O RORO (PATRONES PARA CREAR OBJETOS CON FUNCIONES)

//Funcion para tirar un error al validar si contiene los parametros obligatorios
function requiredParam(param) {
    throw new Error(param + " es obligatorio");
}

//Crear una funcion para crear learning paths utilizando RORO  (Receive One, Return One)
//Recibiendo como parametro un objeto con las propiedades que necesitamos, con objeto privado y publico
//retornando solo el objeto publico
function LearningPath({
    name = requiredParam("name"),
    courses = [],

}) { //guardar cada una de las propiedades
    this.name = name;
    this.courses = courses;
};

//Crear una funcion para crear estudiantes que devuelva un objeto
//Definir las propiedades que espero recibir en un objeto
function Student({
    name = requiredParam("name"),//por default tirar el error
    email = requiredParam("email"),
    age,
    twitter,
    instagram,
    facebook,
    approvedCourses = [],
    learningPaths = [],
} = {}) {


    //video 17/20 13:25
    this.name = name;
    this.email = email;
    this.age = age;
    this.approvedCourses = approvedCourses;
    this.socialMedia = {
        twitter,
        instagram,
        facebook,
    };

    //definir una constante de tipo objeto privada para guardar una propiedad o info a proteger

    const private = { //guardamos dentro una propiedad vacia
        "_learningPaths": [],
    }

    //Creamos un nuevo atributo llamado learningPaths dentro de this
    //crear setters y getter para evitar que lo manipulen
    //para ello tendremos que utilzar de nuevo Object definedProperty

    Object.defineProperty(this, "learningPaths", { //le pasamos el prototipo y la propiedad y objeto con las propiedades
        get() {
            return private["_learningPaths"];//Devolver del objeto privado la propiedad que le creamos
        },
        set(newLp) { //validar si son realmente learningPaths

            if (newLp instanceof LearningPath) { //entrar a la posicion dentro del array "learningPaths"
                private["_learningPaths"].push(newLp); //agregarlo a la privada
            } else {
                console.warn("Alguno de los LPs no es una instancia del prototipo LearningPath");
            }
        },

    });

    //iterar por cada uno de los LP llamar al set y agregar el nuevo LP
    for (learningPathIndex in learningPaths) { //agregar uno a uno los learning paths y enviar a set
        this.learningPaths = learningPaths[learningPathIndex];
    }

};

const escuelaWeb = new LearningPath({ name: "Escuela de WebDev" });
const escuelaData = new LearningPath({ name: "Escuela de Data Science" });
const juan = new Student({
    name: "juanito",
    email: "erazo@gmail.com",
    learningPaths: [
        escuelaWeb,
        escuelaData,
    ],
}); //cambiar la forma en que se crea el estudiante




// video 18/20 10:29

















//Emoticones
/*  [“✌”,“😂”,“😝”,“😁”,“😱”,“👉”,“🙌”,“🍻”,“🔥”,“🌈”,“☀”,“🎈”,“🌹”,“💄”,“🎀”,“⚽”,“🎾”,“🏁”,“😡”,
“👿”,“🐻”,“🐶”,“🐬”,“🐟”,“🍀”,“👀”,“🚗”,“🍎”,“💝”,“💙”,“👌”,“❤”,“😍”,“😉”,“😓”,“😳”,“💪”,“💩”,
“🍸”,“🔑”,“💖”,“🌟”,“🎉”,“🌺”,“🎶”,“👠”,“🏈”,“⚾”,“🏆”,“👽”,“💀”,“🐵”,“🐮”,“🐩”,“🐎”,“💣”,“👃”,
“👂”,“🍓”,“💘”,“💜”,“👊”,“💋”,“😘”,“😜”,“😵”,“🙏”,“👋”,“🚽”,“💃”,“💎”,“🚀”,“🌙”,“🎁”,“⛄”,“🌊”,“⛵”,
“🏀”,“🎱”,“💰”,“👶”,“👸”,“🐰”,“🐷”,“🐍”,“🐫”,“🔫”,“👄”,“🚲”,“🍉”,“💛”,“💚”] */
