import * as bcrypt from 'bcrypt';

export const hashString = async (plainString, saltOrRound) => {
    const hashed = await bcrypt.hash(plainString, saltOrRound);

    return hashed;

}

export const isMatched = async (plainString, hashString) => {
    const isMatch = await bcrypt.compare(plainString, hashString);

    return isMatch;
}

export const isArray = (array: any[] | string | undefined | null | number) => {

    return Array.isArray(array) && array.length > 0
}