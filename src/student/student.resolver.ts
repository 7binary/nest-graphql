import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';

@Resolver(of => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(returns => Array(StudentType))
  students() {
    return this.studentService.findAll();
  }

  @Query(returns => StudentType)
  student(@Args('id') id: string) {
    return this.studentService.findStudentById(id);
  }

  @Mutation(returns => StudentType)
  createStudent(@Args('input') input: CreateStudentInput) {
    return this.studentService.createStudent(input);
  }
}
