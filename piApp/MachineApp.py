import tkinter as tk
from tkinter import ttk
from pymongo import collection
import requests
import pymongo 
from pymongo import MongoClient
#mongo db connector
cluster = MongoClient("mongodb+srv://admin:Plymouth.0410@dmc.7r25y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db=cluster["myFirstDatabase"]
collection= db["machines"]

post={"name":"test123","model":"20211","build":"Test Build1"}

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

# entry = tk.Entry(frame, font=40)
# entry.place(relwidth=0.65, relheight=1)
result =[]
box=ttk.Combobox(frame,state='readonly')
# Machines =collection.find({})
for x in collection.find({}):
    box['values'] = (x) 


# box=ttk.Combobox(frame,state='readonly')
# box['values'] = (Machines) 
box.place(relwidth=1, relheight=1)

# button = tk.Button(frame, text="Set Machine!", font=40, command=lambda: print(box.get()))
# button.place(relx=0.7, relheight=1, relwidth=0.3)

lower_frame = tk.Frame(root, bg='#80c1ff', bd=10)
lower_frame.place(relx=0.5, rely=0.25, relwidth=0.75, relheight=0.6, anchor='n')

button = tk.Button(lower_frame, text="Need Material",bg="orange", font=40, command=lambda: collection.insert_one(post))
button.place(relx=0.1,rely=0.02, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Stopped for\n Material",bg="red", font=40, command=lambda: collection.insert_one(post))
button.place(relx=0.1,rely=0.25, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Needs \nmaintenance",bg="yellow", font=40, command=lambda: collection.insert_one(post))
button.place(relx=0.1,rely=0.48, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Start \nproduction",bg="green", font=40, command=lambda: collection.insert_one(post))
button.place(relx=0.1,rely=0.7, relheight=0.2, relwidth=0.3)


button = tk.Button(lower_frame, text="Need Team \nLeader",bg="purple", font=40, command=lambda: collection.insert_one(post))
button.place(relx=0.6,rely=0.02, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Stopped for \nTeam leader",bg="red", font=40, command=lambda: collection.insert_one(post))
button.place(relx=0.6,rely=0.25, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Stopped for \nmaintenance",bg="red", font=40, command=lambda: collection.insert_one(post))
button.place(relx=0.6,rely=0.48, relheight=0.2, relwidth=0.3)
button = tk.Button(lower_frame, text="Stop \nproduction", font=40, command=lambda: collection.insert_one(post))
button.place(relx=0.6,rely=0.7, relheight=0.2, relwidth=0.3)

root.mainloop()