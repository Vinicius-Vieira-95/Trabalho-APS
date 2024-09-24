import { Controller, Get, Param, Post, Res } from '@nestjs/common';
import { handleError, ok } from '@/presentation/http/helpers/http.helper';
import { AuthRequired } from '@/application/shared/decorators/auth-required.decorator';
import { RolesAllowed } from '@/application/shared/decorators/auth-roles-required.decorator';
import { Response } from 'express';
import { ROLES } from '@/domain/entities/enums/roles.enum';
import { UserService } from '@/application/user/user.service';

@Controller('usuarios')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  @AuthRequired()
  @RolesAllowed([ROLES.COORDINATOR])
  async find(@Param('userId') userId: string, @Res() response: Response) {
    try {
      return response
        .status(200)
        .send(ok(await this.userService.findUserById(userId)));
    } catch (error) {
      return response.status(error.status).send(handleError(error));
    }
  }

  @Post('/estudante')
  async createStudent() {
    return await this.userService.createStudentUser();
  }

  @Post('/professor')
  async createTeacher() {
    return await this.userService.createTeacherUser();
  }
}
