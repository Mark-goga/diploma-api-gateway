import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { API_OPERATION, ENDPOINTS, RESPONSE_MESSAGES } from '@common/constants';
import { TokenGuard } from '@common/guards';
import { FindManyDtoValidator } from '@common/dto/find-mant-documents.dto';

@ApiTags(ENDPOINTS.USERS.BASE)
@Controller(ENDPOINTS.USERS.BASE)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation(API_OPERATION.USERS.FIND_MANY)
  @Get(ENDPOINTS.USERS.FIND_MANY)
  async findMany(@Query() query: FindManyDtoValidator) {
    const data = await this.usersService.findMany(query);
    return {
      ...data,
      message: RESPONSE_MESSAGES.USERS.FIND_MANY,
    };
  }

  @ApiOperation(API_OPERATION.USERS.FIND_ONE)
  @Get(ENDPOINTS.USERS.FIND_ONE)
  async findOne(@Param('id') id: string) {
    const data = await this.usersService.findOne(id);
    return {
      ...data,
      message: RESPONSE_MESSAGES.USERS.FIND_ONE,
    };
  }

  @UseGuards(TokenGuard)
  @ApiOperation(API_OPERATION.USERS.UPDATE)
  @Patch(ENDPOINTS.USERS.UPDATE)
  @HttpCode(HttpStatus.OK)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.usersService.update(id, updateUserDto);
    return {
      ...data,
      message: RESPONSE_MESSAGES.USERS.UPDATE,
    };
  }

  @UseGuards(TokenGuard)
  @ApiOperation(API_OPERATION.USERS.REMOVE)
  @Delete(ENDPOINTS.USERS.REMOVE)
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    const data = await this.usersService.remove(id);
    return {
      ...data,
      message: RESPONSE_MESSAGES.USERS.REMOVE,
    };
  }
}
