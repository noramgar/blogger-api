import bcrypt from 'bcrypt';
import { resolve } from 'path';

export default class User {
    userId: string
    firstName: string
    lastName: string
    emailAddress: string
    hashedPassword: string

    static users: User[] = [];

    constructor(userId: string, firstName: string, lastName: string, emailAddress: string, password: string) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.hashedPassword = this.hashPassword(password)
    }

    save() {
        User.users.push(this)
    }

    static userIdExists(userId: String) {
        for (const user of User.users) {
            if (user.userId === userId) {
                return true;
            }
        }
        return false;
    }
    
    static deleteUser(userId: String) {
        User.users = User.users.filter(user => user.userId !== userId)
    }

    static getUser(id: String) {
        for (const user of User.users) {
            if (user.userId === id) {
                return user;
            }
        }
    }

    update(props: any) {
        for (let prop in this) {
            
            if (prop === 'userId') {
                continue
            }

            if (props.hasOwnProperty(prop)) {
                this[prop] = props[prop]
            }
        }
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.hashedPassword)
            .then((validPassword) => {
                return validPassword
            })
            .catch(e => {
                console.log('Error verifying password')
            })
    }

    hashPassword(password) {
        return bcrypt.hashSync(password, 10)
    }
}