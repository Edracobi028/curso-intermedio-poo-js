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

//Muestra en un array solo los nombres de las keys del objeto, muestra todas aunque su propiedad enumerable este en false
//console.log(Object.getOwnPropertyNames(juan));

//muestra en un array de arrays los atributos y valores de un objeto
//console.log(Object.entries(juan));

//muestra en un objeto de objetos los atributos y valores de un objeto


//Para asignar una nueva propiedad
//Recibe 3 argumentos = objeto + nombreNuevaPropiedad + objeto con atributos

/* Object.defineProperty(juan, "navigator", {
    value: "Chrome", 
    enumerable: false, //permite o evita que se visualize
    writable: true, //permite o evita que se edite   
    configurable: true //permite o evita que lo borren
}); */

//NUEVOS METODOS del superprototipo Object Freeze  y Seal

//pone CONFIGURABLE en false en cada propiedad del objeto  
//Object.seal(juan);

//pone CONFIGURABLE y WRITABLE en false en cada propiedad del objeto 
Object.freeze(juan);


console.log(Object.getOwnPropertyDescriptors(juan));