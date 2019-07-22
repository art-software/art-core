import { getModuleDocToMockConfig } from './getMockDocConfig';
import { IDocToMockConfig } from '../interface/mockGenerator';

export const getParseMockConfig: (moduleList: string[]) => IDocToMockConfig[][] = (moduleList) => {
  return moduleList.map((module) => {
    return getModuleDocToMockConfig(module);
  });
};