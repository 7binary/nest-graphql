import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { Lesson } from './lesson.entity';
import { LessonRepository } from './lesson.repository';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonRepository) private readonly lessonRepo: LessonRepository,
  ) {}

  async assingStudentsToLesson(lessonId: string, studentIds: string[]): Promise<Lesson> {
    const lesson = await this.lessonRepo.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];

    return await this.lessonRepo.save(lesson);
  }

  async findAll(): Promise<Lesson[]> {
    return await this.lessonRepo.find();
  }

  async findLessonById(id: string): Promise<Lesson> {
    return await this.lessonRepo.findOne({ id });
  }

  async createLesson(input: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = input;
    const lesson = this.lessonRepo.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return await this.lessonRepo.save(lesson);
  }
}
