import { Test, TestingModule } from '@nestjs/testing';
import { ProjectSceneService } from './project_scene.service';

describe('ProjectSceneService', () => {
  let service: ProjectSceneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectSceneService],
    }).compile();

    service = module.get<ProjectSceneService>(ProjectSceneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
