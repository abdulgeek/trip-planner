import { SquidService, executable, secureDatabase } from '@squidcloud/backend';

export class ExampleService extends SquidService {
  @secureDatabase('all', 'built_in_db')
  allowAccessToBuiltInDb(): boolean {
    return true;

  }

  @executable()
  async askAI(question: string): Promise<string> {
    const aiResponse = await this.squid.ai().executeAiQuery('built_in_db', question);
    return aiResponse.answer;
  }
}
