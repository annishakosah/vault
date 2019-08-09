import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import { User } from "firebase";

@Injectable()
export class AuthService {
    private authState: any = null;

    constructor(public auth: AngularFireAuth) {
        auth.authState.subscribe((auth) => {
            this.authState = auth;
            console.log(this.authState);
        });
    }

    currentUser(): User {
        return this.authenticated() ? this.authState : null;
    }

    currentUID(): string {
        return this.authenticated() ? this.authState.uid : '';
    }

    // Returns true if user is logged in
    authenticated(): boolean {
        return this.authState !== null;
    }

    signup(credentials) {
        return this.auth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
    }

    login(credentials) {
        return this.auth.auth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        )
    }

    logOut(): Promise<void> {
        return this.auth.auth.signOut();
    }

    updatePassword(password) {
        var user = this.currentUser();
        user.updatePassword(password).then(function () {
            alert("Successfully changed password")
        }).catch(function (error) {
            console.log("Error updating password")
        });
    }

    deleteAccount() {
        var user = this.currentUser().delete().then(function () {
            alert("Successfully deleted account.")
        }).catch(function (error) {
            console.error("Error deleting account")
        });
    }
}
