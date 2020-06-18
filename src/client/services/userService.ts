import { gql } from 'apollo-boost';
import { apolloClient } from '../../App';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {User} from '../shared/interfaces';

class UserService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User|null>(null);

  get user(): Observable<User | null> {
    return this.userSubject.asObservable();
  }

  constructor() {
    this.checkIfAuthorized();
  }

  async signupUser(email: string, password: string, name: string): Promise<User> {
    const query = gql`
mutation {
  signup(
    email: "${email}",
    password: "${password}",
    name: "${name}"
  ) {
    token
    user {
      id
      email
      name
    }
  }
}
    `;
    try {
      const data = await apolloClient.query({query}) as any;
      data.signup.user.token = data.signup.token;
      this.userSubject.next(data.signup.user);
      return data.signup.user;
    } catch (e) {
      const errorMessage = e.response.errors[0].message;
      if (errorMessage.includes('duplicate key error')) {
        throw new Error('User already registered with that email!');
      } else {
        throw new Error(errorMessage);
      }
    }
  }

  async loginUser(email: string, password: string): Promise<UserData> {
    const query = gql`
mutation {
  login(
    email: "${email}",
    password: "${password}",
  ) {
    token
    user {
      id
      email
      name
    }
  }
}
    `;

    try {
      const data = await this.client.request(query) as any;
      data.login.user.token = data.login.token;
      await this.setCurrentUser(data.login.user);
      return data.login.user;
    } catch (e) {
      const errorMessage = e.response.errors[0].message;
      if (errorMessage.includes('No such user found')) {
        throw new Error('Email or password incorrect!');
      } else {
        throw new Error(errorMessage);
      }
    }
  }

  public signUp(): void {

  }

  public login(): void {

  }

  public checkIfAuthorized(): void {
    apolloClient
    .query({
      query: gql`
          {
              me {
                  id
              }
          }
      `
    })
    .then(result => {
      if (!result.errors) {
        this.userSubject.next(result.data.me as User);
      } else {
        this.userSubject.next(null);
      }
    });
  }

}

export default UserService;
