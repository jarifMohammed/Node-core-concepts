import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger();
  getHello(): string {
    return 'Hello World!';
  }
  blocking() {
    const now = new Date().getTime();
    while (new Date().getTime() < now + 10000) {}
    return {};
  }
  async nonBlocking() {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    return { message: 'Done after 10 seconds' };
}

async promises(): Promise<object[]> {
  const results: object[] = [];
  for (let i = 0; i < 10; i++) {
    results.push(await this.sleep());
  }
  return results;
}

private async sleep(): Promise<object> {
  return new Promise<object>((resolve) => {
    this.logger.log('Sleep Start');
    setTimeout(() => {
      this.logger.log('sleep completed');
      resolve({});
    }, 1000);
  });
}

}
