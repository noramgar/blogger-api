import bcrypt from 'bcrypt';

export default class User {
    userID: string
    firstName: string
    lastName: string
    email: string
    hashedPassword: string = ''


    static users: User[] = [];

    constructor(userID: string, firstName: string, lastName: string, email: string, password: string) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hashPassword(password);
    }

    save() {
        User.users.push(this)
    }

    static userIdExists(userID: String) {
        for (const user of User.users) {
            if (user.userID === userID) {
                return true;
            }
        }
        return false;
    }
    
    static deleteUser(userID: String) {
        User.users = User.users.filter(user => user.userID !== userID)
    }

    static getUser(id: String) {
        for (const user of User.users) {
            if (user.userID === id) {
                return user;
            }
        }
    }

    update(props: any) {
        for (let prop in this) {
            
            if (prop === 'userID') {
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
        bcrypt.hash(password, 10, (err, hash) => {
            this.hashedPassword = hash
        })
    }
}