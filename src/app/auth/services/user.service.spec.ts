import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { User } from "../../shared/models/user";

describe('UserService', () => {
  let service: UserService;
  let controller: HttpTestingController;

  const mockUser = [{id: 1, email: 'test', password: 'test'}];
  const usersEndpoint = 'http://localhost:3000/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(UserService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user by email and password', () => {
    let user: User | undefined;
    service.getUserByEmailAndPassword('test', 'test').subscribe(
      u => user = u[0]
    );

    const request = controller.expectOne(req =>
      req.url === usersEndpoint &&
      req.params.get('email') === 'test' &&
      req.params.get('password') === 'test'
    );
    expect(request.request.method).toBe('GET');

    request.flush(mockUser);
    expect(user).toEqual(mockUser[0]);
  });

  it('should return user by email', () => {
    let user: User | undefined;
    service.getUserByEmail('test').subscribe(
      u => user = u[0]
    );

    const request = controller.expectOne(req =>
      req.url === usersEndpoint &&
      req.params.get('email') === 'test'
    );
    expect(request.request.method).toBe('GET');

    request.flush(mockUser);
    expect(user).toEqual(mockUser[0]);
  });

  it('should create new user', () => {
    let user: User | undefined;
    service.createUser('test', 'test').subscribe(
      u => user = u
    );

    const request = controller.expectOne(usersEndpoint);
    expect(request.request.method).toBe('POST');

    request.flush(mockUser[0]);
    expect(user).toEqual(mockUser[0]);
  });
});
