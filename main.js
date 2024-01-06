//Creamos un objeto   Video 3 min 5:56
const juan = {
    name: "Juanito",
    age: 18,
    approvedCourses: ["Curso 1"],
    addCourse(newCourse){
        this.approvedCourses.push(newCourse);
    }
};

//usaremos las propiedades estaticas del prototipo madre Object

//Muestra en un array solo los nombres de las keys del objeto
//console.log(Object.keys(juan));

//Muestra en un array solo los nombres de las keys del objeto
//console.log(Object.getOwnPropertyNames(juan));

//muestra en un array de arrays los atributos y valores de un objeto
//console.log(Object.entries(juan));

//muestra en un objeto de objetos los atributos y valores de un objeto
console.log(Object.getOwnPropertyDescriptors(juan));

//Para asignar una nueva propiedad
//Recibe 3 argumentos = objeto + nombreNuevaPropiedad + objeto con atributos
Object.defineProperty(juan, "pruebaNASA", {
    value: "extraterrestres", 
    enumerable: true, 
    writable: true, 
    configurable: true});