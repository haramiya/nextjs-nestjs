import { CreateTaskDto } from './dto/create-task.dto';
import { TodoService } from './todo.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Task } from '@prisma/client';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getTasks(@Req() req: Request): Promise<Task[]> {
    const task = await this.todoService.getTasks(req.user.id);
    return task;
  }

  @Get(':id')
  async updateTask(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<Task> {
    const task = await this.todoService.getTaskById(req.user.id, taskId);
    return task;
  }

  @Post()
  async createTask(
    @Req() req: Request,
    @Body() dto: CreateTaskDto,
  ): Promise<Task> {
    const task = await this.todoService.createTask(req.user.id, dto);
    return task;
  }

  @Patch(':id')
  async updateTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: CreateTaskDto,
  ): Promise<Task> {
    const task = await this.todoService.updateTaskById(
      req.user.id,
      taskId,
      dto,
    );
    return task;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteTaskById(
    @Req() req: Request,
    @Param('id', ParseIntPipe) taskId: number,
  ): Promise<void> {
    await this.todoService.deleteTaskById(req.user.id, taskId);
  }
}
