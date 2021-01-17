import { Injectable } from '@nestjs/common';
import { Student } from './student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './create-student.input';
import { v4 as uuid } from 'uuid';
import { StudentRepository } from './student.repository';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository) private readonly studentRepo: StudentRepository,
  ) {}

  async findAll(): Promise<Student[]> {
    return await this.studentRepo.find();
  }

  async findStudentById(id: string): Promise<Student> {
    return await this.studentRepo.findOne({ id });
  }

  async createStudent(input: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = input;
    const student = this.studentRepo.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return await this.studentRepo.save(student);
  }

  async findStudentsByIds(studentIds: string[]): Promise<Student[]> {
    return await this.studentRepo.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
