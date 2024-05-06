import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';

// Define a mock TaskModel
class MockTaskModel {}

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        // Provide the mock TaskModel
        { provide: 'TaskModel', useClass: MockTaskModel },
      ],
    }).compile();

    service = moduleRef.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
