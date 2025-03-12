import { Letter } from "./letter.interface";

export interface WordItem { //indica que cada palabra tendrá un letters(un array de letras) y un arcToNext(booleano)
    letters: Letter[];
    arcToNext: boolean;
}