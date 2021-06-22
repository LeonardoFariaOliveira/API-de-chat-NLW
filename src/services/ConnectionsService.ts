import {getCustomRepository, Repository} from "typeorm";
import {ConnectionsRepository} from "../repositories/ConnectionRepository";
import {Connection} from "../entities/Connection";

interface InConnectionCreate{

  admin_id?: string;
  socket_id:string
  user_id:string;
  id?: string;


}


class ConnectionsService{

    private connectionsRepository: Repository<Connection>;
    constructor(){


        this.connectionsRepository = getCustomRepository(ConnectionsRepository);


    }


  async create({admin_id, socket_id, user_id, id}:InConnectionCreate){

    const connection = this.connectionsRepository.create({
      admin_id,
      socket_id,
      user_id,
      id
    });

    await this.connectionsRepository.save(connection);

    return connection;

  }

  async findByUser(user_id:string){


    const connection = this.connectionsRepository.findOne({user_id});

    return connection;

  }

  async findAllWithoutAdmin(){

    const connections = await this.connectionsRepository.find({

      where: {admin_id: null},
      relations: ["user"]

    });

    return connections;

  }

}

export{ ConnectionsService}