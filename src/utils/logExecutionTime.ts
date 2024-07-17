import { Logger } from '@nestjs/common';

export function LogExecutionTime(): MethodDecorator {
  return (
    target: unknown,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      const logger = new Logger(target.constructor.name);
      const start = Date.now();
      try {
        const result = await originalMethod.apply(this, args);
        const end = Date.now();
        const executionTime = end - start;
        logger.debug(
          `[Unary] ${target.constructor.name}->${String(
            propertyKey,
          )}, Duration: ${executionTime}ms`,
        );
        return result;
      } catch (error) {
        logger.error(
          `Error in ${target.constructor.name}->${String(propertyKey)}`,
          error.stack,
        );
        throw error;
      }
    };
    return descriptor;
  };
}
