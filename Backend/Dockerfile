FROM python3.11

WORKDIR /app

COPY ../requirements.txt .

RUN pip3 install -r requirements.txt

COPY app ./app 

EXPOSE 5555

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "5555", "--reload"]

