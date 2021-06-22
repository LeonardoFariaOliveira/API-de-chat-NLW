import {getCustomRepository, Repository} from "typeorm";
import { Setting } from "../entities/Setting";
import { SettingRepository } from "../repositories/SettingsRepository";

interface InSettingsCreate{

chat:boolean;
username:string;


}
class SettingsService{

  private settingsRepository: Repository<Setting> ;

  constructor(){

    this.settingsRepository = getCustomRepository(SettingRepository)

  }

  async create({chat, username}: InSettingsCreate){

    //const settingsRepository =  getCustomRepository(SettingRepository)

    //Select * from settings where username = "username" limit 1
    const userAlreadyExists = await this.settingsRepository.findOne({

      username

    });

    if(userAlreadyExists){

      throw new Error("User já existe");
      

    }


    const settings = this.settingsRepository.create({

      chat,
      username


    })

    await this.settingsRepository.save(settings);

    return settings;



  }

  async findByUsername(username:string){

    const settings = await this.settingsRepository.findOne({username})
    return settings;
  }

  async update(username: string, chat: boolean){
    

      // console.log(chat);
    const settings = await this.settingsRepository
    .createQueryBuilder()
    .update(Setting)
    .set({chat}).where("username = :username", {

      username

    }).execute();
    //const settings = await this.settingsRepository.update(Setting.chat : chat)
    

  

}
}

export {SettingsService}