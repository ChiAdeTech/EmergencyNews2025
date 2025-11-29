from newsfeeds.tasks import *

def run_all_fetch_tasks():
    # Dynamically collect all fetch functions from globals()
    tasks_list = [v for k, v in globals().items() if callable(v) and k.startswith("fetch_")]

    for task in tasks_list:
        task.delay()
        print(f"Task {task.__name__} triggered successfully.")

if __name__ == "__main__":
    run_all_fetch_tasks()
