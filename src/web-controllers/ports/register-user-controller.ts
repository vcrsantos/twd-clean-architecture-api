import { UserData } from '@/entitles'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { created } from '@/web-controllers/util'

export class RegisterUserController {
  private readonly usercase: RegisterUserOnMailingList

  constructor (usecase: RegisterUserOnMailingList) {
    this.usercase = usecase
  }

  public async handle (request : HttpRequest): Promise<HttpResponse> {
    const UserData: UserData = request.body
    const response = await this.usercase.registerUserOnMailingList(UserData)

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
