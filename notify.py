# import requests, os

# def main():
#     send_line_notify( "test" )

# def send_line_notify( notification_message ):
#     # 通知を行う
#     line_notify_token = "FacZHk08Ln7FvjtXYrDfd0oFcAPVLPfjTDac1Q0TFDI"
#     line_notify_api = "https://notify-api.line.me/api/notify"
#     headers = { "Authorization" : f"Bearer {line_notify_token}" }
#     data = {"message" : f"message: {notification_message}"}
#     requests.post( line_notify_api, headers=headers, data=data )

# if __name__ == "__main__":
#     main()
