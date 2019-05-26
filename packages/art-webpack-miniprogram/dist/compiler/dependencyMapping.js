"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DependencyMapping {
}
DependencyMapping.mapping = new Map();
DependencyMapping.willCompiledDependencies = [];
DependencyMapping.getAllMapping = () => {
    return DependencyMapping.mapping;
};
DependencyMapping.getMapping = (filePath) => {
    return DependencyMapping.mapping.get(filePath);
};
DependencyMapping.setMapping = (filePath, dependencies) => {
    if (!DependencyMapping.needUpdate(filePath, dependencies)) {
        return DependencyMapping.mapping;
    }
    if (dependencies.length === 0) {
        return DependencyMapping.deleteMapping(filePath);
    }
    return DependencyMapping.mapping.set(filePath, dependencies);
};
DependencyMapping.needUpdate = (filePath, dependencies) => {
    const mapping = DependencyMapping.mapping;
    const currentMapping = mapping.get(filePath) || [];
    if (currentMapping.length !== dependencies.length) {
        return true;
    }
    for (let i = 0, len = currentMapping.length; i < len; i++) {
        if (!dependencies.includes(currentMapping[i])) {
            return true;
        }
    }
    return false;
};
DependencyMapping.deleteMapping = (filePath) => {
    DependencyMapping.mapping.delete(filePath);
    return DependencyMapping.mapping;
};
DependencyMapping.setWillCompiledDependencies = (filePath) => {
    if (DependencyMapping.willCompiledDependencies.includes(filePath)) {
        return DependencyMapping.willCompiledDependencies;
    }
    DependencyMapping.willCompiledDependencies.push(filePath);
    return DependencyMapping.willCompiledDependencies;
};
DependencyMapping.getWillCompiledDependencies = () => {
    return DependencyMapping.willCompiledDependencies;
};
exports.DependencyMapping = DependencyMapping;
