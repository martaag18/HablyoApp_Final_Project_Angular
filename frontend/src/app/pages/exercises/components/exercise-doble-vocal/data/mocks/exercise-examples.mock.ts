import { ExerciseData } from "../../../../../../shared/interfaces/exercise-data.interface";

export const EXERCISES_DOBLE_VOCAL: ExerciseData[] = [
  {
    id: 1,
    text: "Mi abuelo come maíz.",
    instructions: "P en 'Mi' (final i). Doble vocal 'ai' en 'maíz'.",
    tildeIndices: [2, 4, 13],
    pIndices: [1],
    vdobleIndices: [4, 5, 13, 14] // 'ue' en 'abuelo' y 'ai' en 'maíz'
  },

  {
    id: 2,
    text: "Fue amable y me ayudó",
    instructions: "P en 'Fue'. Doble vocal 'ai' en 'maíz'.",
    tildeIndices: [3, 5, 13],
    pIndices: [2],
    vdobleIndices: [3, 4, 10, 11] // 'ai' en 'maíz'
  },

  {
    id: 3,
    text: "Se adentra en un sueño dulce.",
    instructions: "P en 'Se'. Doble vocal 'ue' en 'sueño'.",
    tildeIndices: [2, 4, 14],
    pIndices: [1],
    vdobleIndices: [7, 8] // 'ue' en 'sueño'
  },

  {
    id: 4,
    text: "Te agrada leer el diario hoy.",
    instructions: "P en 'Te'. Doble vocal 'ia' en 'diario'.",
    tildeIndices: [2, 5, 15],
    pIndices: [1],
    vdobleIndices: [13, 14] // 'ia' en 'diario'
  },

  {
    id: 5,
    text: "Lo entiendo y valoro mucho.",
    instructions: "P en 'Lo'. bridging en 'entiendo'. No hay doble vocal clara.",
    tildeIndices: [2, 5],
    pIndices: [1],
    vdobleIndices: []
  },

  {
    id: 6,
    text: "Da un paso valiente ahora.",
    instructions: "P en 'Da'. bridging en 'un' (u?), no doble vocal clara.",
    tildeIndices: [2, 5],
    pIndices: [1],
    vdobleIndices: []
  },

  {
    id: 7,
    text: "Vi un ave increíble ayer.",
    instructions: "P en 'Vi'. Doble vocal 'ei' en 'increíble'.",
    tildeIndices: [4, 7, 12],
    pIndices: [1],
    vdobleIndices: [10, 11] // 'ei' en 'increíble'
  },

  {
    id: 8,
    text: "Me alivia beber agua fresca.",
    instructions: "P en 'Me'. Doble vocal 'au' en 'agua'.",
    tildeIndices: [2, 4, 15],
    pIndices: [1],
    vdobleIndices: [4, 5] // 'au' en 'agua'
  },

  {
    id: 9,
    text: "Su hermano canta ópera fina.",
    instructions: "P en 'Su'. H muda en 'hermano'. 'ó' no es diptongo, bridging si deseas.",
    tildeIndices: [3, 6, 14],
    pIndices: [1],
    vdobleIndices: []
  },

  {
    id: 10,
    text: "Soy diestro y corro a diario.",
    instructions: "P en 'Soy'. Doble vocal 'ia' en 'diario'.",
    tildeIndices: [4, 19],
    pIndices: [2],
    vdobleIndices: [13, 14] // 'ia' en 'diario'
  },

  {
    id: 11,
    text: "Fue un día inolvidable hoy.",
    instructions: "P en 'Fue'. Doble vocal 'ía' en 'día'. bridging si 'un' inicia en vocal (u).",
    tildeIndices: [3, 6, 13],
    pIndices: [2],
    vdobleIndices: [7, 8] // 'ía' en 'día'
  },

  {
    id: 12,
    text: "Te cuido con gran esmero.",
    instructions: "P en 'Te'. bridging en 'cuido'. No doble vocal.",
    tildeIndices: [3, 4],
    pIndices: [1],
    vdobleIndices: []
  },

  {
    id: 13,
    text: "Lo guardo en mi mente.",
    instructions: "P en 'Lo'. bridging en 'guardo'? 'mi' final i. No doble vocal clara.",
    tildeIndices: [3, 4, 11],
    pIndices: [1],
    vdobleIndices: []
  },

  {
    id: 14,
    text: "Se entrega y triunfa rápido.",
    instructions: "P en 'Se'. bridging en 'entrega'. Doble vocal 'iu' en 'triunfa' (discutible).",
    tildeIndices: [2, 8, 12],
    pIndices: [1],
    vdobleIndices: [11, 12] // 'iu' en 'triunfa'
  },

  {
    id: 15,
    text: "Da tiempo y recibe ayuda.",
    instructions: "P en 'Da'. bridging en 'tiempo'. 'ayuda' con 'ay' semivocal.",
    tildeIndices: [3, 4, 15],
    pIndices: [1],
    vdobleIndices: []
  },

  {
    id: 16,
    text: "Vi luces en el cielo abierto.",
    instructions: "P en 'Vi'. Doble vocal 'ie' en 'cielo'. bridging en 'abierto' si deseas.",
    tildeIndices: [3, 12, 13],
    pIndices: [1],
    vdobleIndices: [7, 8] // 'ie' en 'cielo'
  },

  {
    id: 17,
    text: "Me nutro de aire puro.",
    instructions: "P en 'Me'. Doble vocal 'ai' en 'aire'. bridging en 'nutro'??",
    tildeIndices: [3, 9, 10],
    pIndices: [1],
    vdobleIndices: [4, 5] // 'ai' en 'aire'
  },

  {
    id: 18,
    text: "Su error suena a lamento.",
    instructions: "P en 'Su'. bridging en 'error'? No doble vocal clara, 'a' en 'lamento'??",
    tildeIndices: [2, 9, 14],
    pIndices: [1],
    vdobleIndices: []
  },

  {
    id: 19,
    text: "Mi tía va al teatro.",
    instructions: "P en 'Mi'. Doble vocal 'ía' en 'tía'. bridging en 'va'??", 
    tildeIndices: [3, 6],
    pIndices: [1],
    vdobleIndices: [4, 5] // 'ía' en 'tía'
  },

  {
    id: 20,
    text: "Soy alto y toco el piano.",
    instructions: "P en 'Soy'. Doble vocal 'ia' en 'piano'. bridging en 'alto'??",
    tildeIndices: [3, 15],
    pIndices: [2],
    vdobleIndices: [13, 14] // 'ia' en 'piano'
  },
];
