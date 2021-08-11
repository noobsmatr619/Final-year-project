const request = require('supertest');
var expect = require('chai').expect;
const server = require('./server.test');
const User = require('../Models/User');
// const TemporaryUser = require('../Models/TempUsers');
const TempUser = require('../Models/TempUser');
describe('Tests', () => {
  /***
   * Clear users table data from the dummy database if left any !
   */
  describe('Clear data', () => {
    it('Clear data from database', async () => {
      await User.remove();
    });
  });

  /**
   * Users test cases for the auth routes
   */
  describe('Users', () => {
    it('should not register a user', async () => {
      //empty body
      const registerUser = {};
      await request(server)
        .post('/api/v1/auth/registerUser')
        .send(registerUser)
        .expect(500);
    });

    // it('should register a user', async () => {
    //   //user information
    //   process.env.JWT_EXPIRE = '3d'
    //   const registerUser = {
    //     displayName: 'John',
    //     email: 'testUser1@gmail.com',
    //     password: 'Test1234!',
    //     actualName: 'testssz',
    //     type:'staff'
    //   };
    //   await request(server)
    //     .post('/api/v1/auth/registerUser')
    //     .send(registerUser)
    //     .expect(200);
    // });
    it('should not register a user', async () => {
      //user information
      const registerUser = {
        displayName: 'John',
        email: 'testUser1test4.com', //negative flow, sent email without @ so that server sends back 500
        password: 'Test1234!',
        actualName: 'testssz'
      };
      await request(server)
        .post('/api/v1/auth/registerUser')
        .send(registerUser)
        .expect(500);
    });
    it('should not register a user', async () => {
      //user information
      const registerUser = {
        // displayName: 'John', commented out on purpose to cehck if it fails wihout display name as its recquired
        email: 'testUser1test4.com', //negative flow, sent email without @ so that server sends back 500
        password: 'Test1234!',
        actualName: 'testssz'
      };
      await request(server)
        .post('/api/v1/auth/registerUser')
        .send(registerUser)
        .expect(500);
    });
    it('should not successfully login', async () => {
      await request(server)
        .post('/api/v1/auth/login')
        .send({
          email: 'invalidUser@gmail.com',
          password: 'P@ssw0rd'
        })
        .expect(401);
    });

    // it('should successfully login', async () => {
    //   process.env.JWT_EXPIRE = '3d' 
    //   await request(server)
    //     .post('/api/v1/auth/login')
    //     .send({
    //       email: 'testUser1@gmail.com',
    //       password: 'Test1234!'
    //     })
    //     .expect(200);
    // });

    it('should not find route', async () => {
      const response = await request(server)
        .get('/api/v1/auth/invalidEndpoint')
        .expect(404);
    });

    it('should get all users', async () => {
      const response = await request(server)
        .get('/api/v1/auth/getAllUsers')
        .expect(200);
    });

    it('should get me information', async () => {
      await request(server).get('/api/v1/auth/getMe').expect(401);
    });

    it('should get staff information', async () => {
      await request(server).get('/api/v1/auth/getStaff').expect(200);
    });
  });
  /**
   * Products test cases for the product routes
   */
  describe('Products', () => {
    it('should not create product', async () => {
      const addProduct = {
        name: 'testName',
        image: '#',
        star: 4,
        category: 'pet',
        size: 'm',
        quantity: '2',
        description: 'testLorem',
        price: '2'
      };
      await request(server)
        .post('/api/v1/products/createProduct')
        .send(addProduct)
        .expect(500);
    });

    it('should get all products', async () => {
      await request(server).get('/api/v1/products/getAllProducts').expect(200);
    });
  });

  /**
   * Tasks test cases for the product routes
   */
  describe('Tasks', () => {
    it('should get all tasks', async () => {
      await request(server).get('/api/v1/tasks/getAllTasks').expect(401);
    });
  });

  /**
   * Machines test cases for the machine routes
   */
  describe('Machines', () => {
    it('should get all machines', async () => {
      await request(server).get('/api/v1/machines/getAllMachines').expect(200);
    });
  });
  /**
   * Negative flow , should unauthorize team creating
   */
  describe('Teams', () => {
    it('should not be authorized to get all Teams', async () => {
      await request(server).get('/api/v1/teams/getAllTeams').expect(401);
    });
  });
  /**
   * Negative flow , should unauthorize task creation
   */
  describe('Tasks', () => {
    it('should not be authorized to get all Tasks', async () => {
      await request(server).get('/api/v1/tasks/getAllTasks').expect(401);
    });
  });
  /**
   * Negative flow , should unauthorize task completing
   */
  describe('Tasks compeletion', () => {
    it('task should not be found ', async () => {
      await request(server).get('/api/v1/tasks/markCompleted').expect(404);
    });
  });
  /**
   * Negative flow , should unauthorize creating task
   */
  describe('Task creation', () => {
    it('task cannot be created ', async () => {
      await request(server).get('/api/v1/tasks/createTask').expect(404);
    });
  });

  /**
   * Negative flow , should unauthorize creating team
   */
  describe('Team creation', () => {
    it('team cannot be created ', async () => {
      await request(server).get('/api/v1/teams/createTeam').expect(404);
    });
  });
  /**
   * Negative flow , should unauthorize getting my team
   */
  describe('Getting teams', () => {
    it('Cannot get team', async () => {
      await request(server).get('/api/v1/teams/getMyTeams').expect(401);
    });
  });
  /**
   * Negative flow , should unauthorize getting salary
   */
  describe('Salary', () => {
    it('Cannot get salary ', async () => {
      await request(server).get('/api/v1/salaries/getSalaries').expect(401);
    });
  });
  /**
   * Negative flow , should unauthorize paying salary
   */
  describe('Cannot pay salary ', () => {
    it('Salary cannot be paid ', async () => {
      await request(server).get('/api/v1/salaries/paySalary').expect(404);
    });
  });
  /**
   * positive flow , should get raw materials
   */
  describe('Cannot get raw materials', () => {
    it('Raw materials cannot be acquired ', async () => {
      await request(server)
        .get('/api/v1/rawMaterials/getAllRawMaterials')
        .expect(200);
    });
  });
  /**
   * positive flow , should put raw materials
   */
  describe('Put raw materials to put in stock  ', () => {
    it('Raw materials put in stock  ', async () => {
      await request(server)
        .get('/api/v1/rawMaterials/getAllRawMaterials')
        .expect(200);
    });
  });
  /**
   * negative flow , should not put raw material
   */
  describe('Will not allow adding raw materials ', () => {
    it('Raw materials cannot be added ', async () => {
      await request(server)
        .get('/api/v1/rawMaterials/addNewRawMaterial')
        .expect(404);
    });
  });
  /**
   * negative flow , should not allow to get projects
   */
  describe('Cannot get projects ', () => {
    it('Project is not accessible ', async () => {
      await request(server).get('/api/v1/projects/getAllProjects').expect(401);
    });
  });
  /**
   * negative flow , should not allow to assign projects
   */
  describe('Cannot assign projects ', () => {
    it('Project is not assignable', async () => {
      await request(server).get('/api/v1/projects/assignProject').expect(404);
    });
  });
  /**
   * negative flow , should not allow to create projects
   */
  describe('Cannot create projects ', () => {
    it('Project is not creatable', async () => {
      await request(server).get('/api/v1/projects/createProject').expect(404);
    });
  });
  /**
   * negative flow , should not allow to create products
   */
  describe('Cannot create products ', () => {
    it('Product is not creatable', async () => {
      await request(server).get('/api/v1/products/createProduct').expect(404);
    });
  });
  /**
   * negative flow , should not allow to add products
   */
  describe('Cannot add products ', () => {
    it('Product cannot be added ', async () => {
      await request(server)
        .get('/api/v1/products/addProductByMachine')
        .expect(404);
    });
  });
  /**
   * negative flow , should not allow to reject
   */
  describe('Cannot reject products ', () => {
    it('Product cannot be rejected ', async () => {
      await request(server)
        .get('/api/v1/products/rejectProductsCount')
        .expect(404);
    });
  });
  /**
   * positive flow , should  allow to get all products
   */
  describe('Get all products   ', () => {
    it('Product can be received ', async () => {
      await request(server).get('/api/v1/products/getAllProducts').expect(200);
    });
  });
  /**
   * positive flow , should  allow to get all produced products
   */
  describe('Get all produced  products   ', () => {
    it('Product can be received ', async () => {
      await request(server)
        .get('/api/v1/products/getProductsProduced')
        .expect(200);
    });
  });
  /**
   * negative flow , should  not allow to order
   */
  describe('Cannot place order', () => {
    it('Orders can not be received ', async () => {
      await request(server).get('/api/v1/orders/placeMyOrder').expect(404);
    });
  });
  /**
   * negative flow , should  not allow to change order
   */
  describe('Cannot change status order', () => {
    it('Orders can not be changed', async () => {
      await request(server).get('/api/v1/orders/updateOrderStatus').expect(404);
    });
  });
  /**
   * negative flow , should  not allow to get employee  order
   */
  describe('Unauthorized to get employee  order', () => {
    it('Orders can not be aquired', async () => {
      await request(server).get('/api/v1/orders/getEmployeeOrders').expect(401);
    });
  });
  /**
   * negative flow , should  not allow to add machines
   */
  describe('Unauthorized to add machines ', () => {
    it('Machines can not be added', async () => {
      await request(server).get('/api/v1/machines/addNewMachine').expect(404);
    });
  });
  /**
   * positive flow , should allow to get machines
   */
  describe('Get all machines', () => {
    it('Machines can be got', async () => {
      await request(server).get('/api/v1/machines/getAllMachines').expect(200);
    });
  });
  /**
   * positive flow , should allow to get machines maintained
   */
  describe('Get all machines maintained ', () => {
    it('Machines can be maintained ', async () => {
      await request(server)
        .get('/api/v1/machines/getMaintainanceMoodMachines')
        .expect(200);
    });
  });
  /**
   * Negative  flow , should not get machine mood
   */
  describe('Cannot get machine mood ', () => {
    it('Mchine mood is unattainable ', async () => {
      await request(server)
        .get('/api/v1/machines/goOnMaintainanceMood')
        .expect(404);
    });
  });

  /**
   * Negative  flow , should not update machine target
   */
  describe('Cannot get machine target ', () => {
    it('Mchine target is unattainable ', async () => {
      await request(server)
        .get('/api/v1/machines/updateMachineTarget')
        .expect(404);
    });
  });

  /**
   * Negative  flow , should not send message
   */
  describe('Cannot send message', () => {
    it('Cannot send message ', async () => {
      await request(server).get('/api/v1/chats/sendMessage').expect(404);
    });
  });
  /**
   * Negative  flow , should not get message
   */
  describe('Cannot get message', () => {
    it('Cannot get message ', async () => {
      await request(server).get('/api/v1/chats/getAllChats').expect(401);
    });
  });
  /**
   * Negative  flow , should not get message
   */
  describe('Cannot get user message ', () => {
    it('Cannot get message ', async () => {
      await request(server).get('/api/v1/chats/getUserChat').expect(401);
    });
  });
  /**
   * Negative  flow , approve user
   */
  describe('Cannot approve user ', () => {
    it('Cannot approve user ', async () => {
      await request(server).get('/api/v1/users/approveuser').expect(404);
    });
  });
  /**
   * Negative  flow , cannot login
   */
  describe('Cannot log in ', () => {
    it('Cannot log in ', async () => {
      await request(server).get('/api/v1/users/login').expect(404);
    });
  });
  /**
   * Negative  flow , cannot chage role
   */
  describe('Cannot change role  ', () => {
    it('Cannot change role  ', async () => {
      await request(server).get('/api/v1/users/updateRole').expect(404);
    });
  });

  /**
   * Negative  flow , cannot get all user
   */
  describe('Cannot get users ', () => {
    it('Cannot get users ', async () => {
      await request(server).get('/api/v1/users/getAllUsers').expect(404);
    });
  });
  /**
   * Negative  flow , cannot get any stuffs
   */
  describe('Cannot get staffs  ', () => {
    it('Cannot get staffs ', async () => {
      await request(server).get('/api/v1/users/getAllUsers').expect(404);
    });
  });
  /**
   * Negative  flow , cannot get all users
   */
  describe('Cannot get staffs  ', () => {
    it('Cannot get staffs ', async () => {
      await request(server).get('/api/v1/users/getAllUsers').expect(404);
    });
  });

  /**
   * Negative  flow , cannot get all staffs
   */
  describe('Cannot get staffs  ', () => {
    it('Cannot get staffs ', async () => {
      await request(server).get('/api/v1/users/getStaff').expect(404);
    });
  });

  /**
   * Negative  flow , cannot get me
   */
  describe('Cannot get me ', () => {
    it('Cannot get me', async () => {
      await request(server).get('/api/v1/users/getMe').expect(404);
    });
  });
  /**
   * Negative  flow , cannot get  emplyee or staff
   */
  describe('Cannot get me ', () => {
    it('Cannot get me', async () => {
      await request(server)
        .get('/api/v1/users/getEmployeeAndStaff')
        .expect(404);
    });
  });

  /**
   * Negative  flow , cannot get  any emplyee
   */
  describe('Cannot get emplyees ', () => {
    it('Cannot get emplyees', async () => {
      await request(server).get('/api/v1/users/getAllEmployees').expect(404);
    });
  });
  /**
   * Negative  flow , cannot add any manger
   */
  describe('Cannot add any manager ', () => {
    it('Cannot add any manager ', async () => {
      await request(server).get('/api/v1/users/addmanager').expect(404);
    });
  });
  /**
   * Negative  flow , cannot add any employee
   */
  describe('Cannot add any employee ', () => {
    it('Cannot add any employee ', async () => {
      await request(server).get('/api/v1/users/addemployee').expect(404);
    });
  });
  /**
   * Negative  flow , cannot add any admin
   */
  describe('Cannot add any admin ', () => {
    it('Cannot add any admin ', async () => {
      await request(server).get('/api/v1/users/addadmin').expect(404);
    });
  });
  /**
   * Negative  flow , cannot bypass null/invalid pointer
   */
  describe('Cannot bypass null/invalid pointer ', () => {
    it('Cannot bypass null/invalid pointer ', async () => {
      await request(server).get('/api/v1/users/').expect(404);
    });
  });

  /**
   * Chats test cases for the chats routes
   */
  describe('Chats', () => {
    it('should create chat', async () => {
      const chats = {
        task: 'task',
        employee: 'employee'
      };
      await request(server).post('/api/v1/createTask').send(chats).expect(404);
    });
  });

  /**
   * Negative  flow , cannot delete user
   */
  describe('Cannot delete user  ', () => {
    it('Cannot delete user ', async () => {
      await request(server).get('/api/v1/users/delete').expect(404);
    });
  });
  // cleanup dummy database at end
  describe('Clear data', () => {
    it('Clear data from database', async () => {
      await User.remove();
    });
  });

  describe('Clear data', () => {
    it('Clear data from database', async () => {
      await TempUser.remove();
    });
  });
});
