"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const firebaseService_1 = require("../services/firebaseService");
class Entity {
    constructor(collectionName) {
        this.collectionName = collectionName;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield firebaseService_1.db.collection(this.collectionName).get();
            return snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield firebaseService_1.db.collection(this.collectionName).doc(id).get();
            return doc.exists ? Object.assign({ id: doc.id }, doc.data()) : null;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield firebaseService_1.db.collection(this.collectionName).add(data);
            return docRef.id;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebaseService_1.db.collection(this.collectionName).doc(id).update(data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield firebaseService_1.db.collection(this.collectionName).doc(id).delete();
        });
    }
}
exports.Entity = Entity;
