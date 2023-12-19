import { Post } from "@/typings";
import { utilService } from "./util.service"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    insertMany,
    save
}

export interface Entity {
    _id: string;
    [key: string]: any;
}

function query<T>(entityType: string, delay = 500): Promise<T[]> {
    const storedData = localStorage.getItem(entityType);
    const entities = storedData ? JSON.parse(storedData) : [];

    return new Promise(resolve => setTimeout(() => resolve(entities), delay));
}


function get(entityType: string, entityId: string) {
    return query<Entity>(entityType).then((entities: Entity[]) => {
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType: string, newEntity: Entity | Post) {
    newEntity = JSON.parse(JSON.stringify(newEntity)) as Entity
    newEntity._id = utilService.makeId()
    console.log(newEntity)
    return query<Entity>(entityType).then(entities => {
        entities.unshift(newEntity as Post)
        save(entityType, entities)
        return newEntity
    })
}

function put(entityType: string, updatedEntity: Entity) {
    updatedEntity = JSON.parse(JSON.stringify(updatedEntity))
    return query<Entity>(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType: string, entityId: string) {
    return query<Entity>(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        save(entityType, entities)
    })
}

function insertMany(entityType: string, entities: Entity[]) {
    entities.forEach(entity => entity._id = utilService.makeId())
    save(entityType, entities)
}


function save(entityType: string, entities: Entity[]) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}