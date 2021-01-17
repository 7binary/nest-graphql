import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './lesson.input';
import { AssignStudentsToLessonInput } from './assign-students-to-lesson.input';
import { Lesson } from './lesson.entity';
import { StudentService } from '../student/student.service';

@Resolver(of => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}

  @Query(returns => Array(LessonType))
  lessons() {
    return this.lessonService.findAll();
  }

  @Query(returns => LessonType)
  lesson(@Args('id') id: string) {
    return this.lessonService.findLessonById(id);
  }

  @Mutation(returns => LessonType)
  createLesson(@Args('input') input: CreateLessonInput) {
    return this.lessonService.createLesson(input);
  }

  @Mutation(returns => LessonType)
  assignStudentsToLesson(@Args('input') input: AssignStudentsToLessonInput) {
    const { lessonId, studentIds } = input;
    return this.lessonService.assingStudentsToLesson(lessonId, studentIds);
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return await this.studentService.findStudentsByIds(lesson.students);
  }
}
