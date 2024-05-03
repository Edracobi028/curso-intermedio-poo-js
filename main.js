

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

//Crear una funcion para crear estudiantes que devuelva un objeto
//Definir las propiedades que espero recibir en un objeto
function createStudent({
    name = requiredParam("name"),//por default tirar el error
    email = requiredParam("email"),
    age,
    twitter,
    instagram,
    facebook,
    approvedCourses = [],
    learningPaths = [],
} = {}) {

    //objeto para guardar las props que no se deban cambiar directamente desde el objeto
    const private = {
        "_name": name,
    };

    const public = {
        email,
        age,
        approvedCourses,
        learningPaths,
        socialMedia: {
            twitter,
            instagram,
            facebook,
        },
        readName() {
            return private["_name"];
        },
        changeName(newName) {
            private["_name"] = newName;
        },
    };

    //evitar que puedas editar las funciones publicas de readName y changeName
    //pasamos en parametros: el objeto, la propiedad y los atributos
    Object.defineProperty(public, "readName", {
        configurable: false, //evitamos lo borren
        writable: false,     //evitar editar la funcion 
    });

    Object.defineProperty(public, "changeName", {
        configurable: false,
        writable: false,
    });



    return public;
};


const juan = createStudent({ name: "juanito", email: "erazo@gmail.com" });

//13-20 min 6:22
//Clase estudiante base sin prototipos aplicando abstraccion

//todas las props que tendra el estudiante
/*
const studentBase = {
    name: undefined,
    email: undefined,
    age: undefined,
    approvedCourses: undefined,
    learningPaths: undefined,
    socialMedia: {
        twitter: undefined,
        instagram: undefined,
        facebook: undefined,
    },
};
*/

//crear una constante por cada estudiante usando la funcion deep-copy pasandole el objeto estudent-base
/*
const juan = deepCopy(studentBase);
*/
//Editar con las propiedades y evitar se puedan eliminar en el futuro con la funcion defineProperty
/*
Object.defineProperty(juan, "name", {
    value: "Juanito",
    configurable: false, //evitar la puedan eliminar
});
*/

//Editar con las propiedades y evitar se puedan eliminar en el futuro la funcion seal()
/*
Object.seal(juan);
*/




















//Emoticones
/*  [“✌”,“😂”,“😝”,“😁”,“😱”,“👉”,“🙌”,“🍻”,“🔥”,“🌈”,“☀”,“🎈”,“🌹”,“💄”,“🎀”,“⚽”,“🎾”,“🏁”,“😡”,
“👿”,“🐻”,“🐶”,“🐬”,“🐟”,“🍀”,“👀”,“🚗”,“🍎”,“💝”,“💙”,“👌”,“❤”,“😍”,“😉”,“😓”,“😳”,“💪”,“💩”,
“🍸”,“🔑”,“💖”,“🌟”,“🎉”,“🌺”,“🎶”,“👠”,“🏈”,“⚾”,“🏆”,“👽”,“💀”,“🐵”,“🐮”,“🐩”,“🐎”,“💣”,“👃”,
“👂”,“🍓”,“💘”,“💜”,“👊”,“💋”,“😘”,“😜”,“😵”,“🙏”,“👋”,“🚽”,“💃”,“💎”,“🚀”,“🌙”,“🎁”,“⛄”,“🌊”,“⛵”,
“🏀”,“🎱”,“💰”,“👶”,“👸”,“🐰”,“🐷”,“🐍”,“🐫”,“🔫”,“👄”,“🚲”,“🍉”,“💛”,“💚”] */
