from flask import Flask, request, jsonify
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
from flask_cors import CORS  # Importa o CORS

load_dotenv()

app = Flask(__name__)   # Cria o app uma única vez
CORS(app)               # Aplica CORS ao app

EMAIL = os.getenv('EMAIL')              # sua conta gmail que vai enviar
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')  # senha do app
TO_EMAIL = os.getenv('EMAIL')           # o email que vai receber (você mesmo)

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    print("Dados recebidos:", data)

    name = data.get('name') or ''
    email = data.get('email') or ''
    phone = data.get('phone') or ''
    style = data.get('style') or ''
    message = data.get('message') or ''

    try:
        msg = MIMEMultipart()
        msg['From'] = EMAIL                 # seu email
        msg['To'] = TO_EMAIL                # você mesmo recebe
        msg['Subject'] = f'Novo agendamento de {name}'

        body = f'''
        Novo agendamento:
        Nome: {name}
        Email do cliente: {email}
        Telefone: {phone}
        Estilo de tatuagem: {style}
        Mensagem: {message}
        '''

        msg.attach(MIMEText(body, 'plain'))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(EMAIL, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()

        return jsonify({'success': True})

    except Exception as e:
        print(f'Erro ao enviar email: {e}')
        return jsonify({'success': False}), 500


if __name__ == '__main__':
    app.run(debug=True)
