import pymongo
import tkinter as tk
from tkinter import ttk
#mongo connector
connection_url = "mongodb+srv://admin:Plymouth.0410@dmc.7r25y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

client = pymongo.MongoClient(connection_url)

database_name = 'myFirstDatabase' # The name of my database. 
my_db = client[database_name]

collection = my_db['machines'] # The name of a collection(table) of our database. 

# document = { #creating documentation insertion 
#             "status": 0,
#             "target": 100,
#             "name": "1nd Machine"}
# collection.insert_one(document)

result = collection.find({}, {"name": 1})  ## Here name=1 means I'm just fetching the names to display on dropdown




#takes 2 parameters , the values selected on the box and the the values of the status to set the machine 
def execute_query(value, status): 
    '''This function takes two parameters.
    1st the value which is to be searched
    2nd the status number to be set
     '''
    query = {"name": f'{value}'}
    find = collection.find_one(query)
    update = {'$set': {"status": status}}
    collection.update_one(find, update)


HEIGHT = 500
WIDTH = 600

root = tk.Tk()
root.title('DMC Machine Terminal')
canvas = tk.Canvas(root, height=HEIGHT, width=WIDTH)
canvas.pack()

background_image = tk.PhotoImage(file='machine.png')
background_label = tk.Label(root, image=background_image)
background_label.place(relwidth=1, relheight=1)

frame = tk.Frame(root, bg='#80c1ff', bd=5)
frame.place(relx=0.5, rely=0.1, relwidth=0.75, relheight=0.1, anchor='n')

entry = tk.Entry(frame, font=40)
entry.place(relwidth=0.65, relheight=1)

values = [i['name'] for i in result]

print(values)
box = ttk.Combobox(frame, values=values)
box.place(relwidth=1, relheight=1)



lower_frame = tk.Frame(root, bg='#80c1ff', bd=10)
lower_frame.place(relx=0.5, rely=0.25, relwidth=0.75, relheight=0.6, anchor='n')


button = tk.Button(lower_frame, text="Need Material",bg="orange", font=40, command=lambda: execute_query(box.get(), 1))
button.place(relx=0.1,rely=0.02, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Stopped for\n Material",bg="red", font=40, command=lambda: execute_query(box.get(), 2))
button.place(relx=0.1,rely=0.25, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Needs \nmaintenance",bg="yellow", font=40, command=lambda: execute_query(box.get(), 3))
button.place(relx=0.1,rely=0.48, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Start \nproduction",bg="green", font=40, command=lambda: execute_query(box.get(), 4))
button.place(relx=0.1,rely=0.7, relheight=0.2, relwidth=0.3)


button = tk.Button(lower_frame, text="Need Team \nLeader",bg="purple", font=40, command=lambda: execute_query(box.get(), 5))
button.place(relx=0.6,rely=0.02, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Stopped for \nTeam leader",bg="red", font=40, command=lambda: execute_query(box.get(), 6))
button.place(relx=0.6,rely=0.25, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Stopped for \nmaintenance",bg="red", font=40, command=lambda: execute_query(box.get(), 7))
button.place(relx=0.6,rely=0.48, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Stop \nproduction", font=40, command=lambda: execute_query(box.get(), 8))
button.place(relx=0.6,rely=0.7, relheight=0.2, relwidth=0.3)
root.mainloop()
