import { InvalidEmailError } from '../../entitles/errors/invalid-email-error'
import { InvalidNameError } from '../../entitles/errors/invalid-name-error'
import { User } from '../../entitles/user'
import { UserData } from '../../entitles/user-data'
import { Either, left, right } from '../../shared/either'
import { UserRepository } from './ports/user-repository'

export class RegisterUserOnMailingList {
  private readonly userRepo: UserRepository

  constructor (userRepo: UserRepository) {
    this.userRepo = userRepo
  }

  public async registerUserOnMailingList (request: UserData):
   Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    if (!(await this.userRepo.exists(request))) {
      await this.userRepo.add(request)
    }
    return right(request)
  }
}
