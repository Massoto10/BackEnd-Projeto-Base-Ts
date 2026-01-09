import { Imprimivel } from "../utils/imprimivel";
import { Comparavel } from "./comparavel";

export interface ModeloInterfaces<T> extends Imprimivel, Comparavel<T>{
}