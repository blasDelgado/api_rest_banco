"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreaRelaciones {
    //Crea una relacion entre dos modelos de 1 a 1.
    static agregarRelacionUnoAUno(m1, m2, fk, fk2) {
        if (fk2) {
            m1.hasOne(m2, { foreignKey: fk });
            m2.hasOne(m1, { foreignKey: fk2 });
        }
        else {
            m1.hasOne(m2, { foreignKey: fk });
            m2.hasOne(m1, { foreignKey: fk });
        }
    }
}
exports.default = CreaRelaciones;
