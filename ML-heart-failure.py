import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

from sklearn.preprocessing import MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix

heart_failure_file_path = 'heart_failure_clinical_records_dataset.csv'
heart_failure_data = pd.read_csv(heart_failure_file_path)

print(heart_failure_data.head())
print(heart_failure_data.info())
print(heart_failure_data.describe())

custom_colors = ["#FF5733", "#3366FF", "#33FF57"]
sns.histplot(heart_failure_data['age'], kde=True, color=custom_colors[0])
plt.xlabel('Varsta')
plt.ylabel('Frecventa')
fig = plt.gcf()
fig.canvas.manager.set_window_title('Varsta')
plt.show()

#Sexul feminin sau masculin
sex_count=heart_failure_data['sex'].value_counts()
plt.figure(figsize = (6, 6))
explode = (0, 0.09)
sex_count.plot(kind = 'pie', fontsize = 12,style='_classic_test_patch', explode = explode, autopct = '%.1f%%')
plt.title('Masculin vs Feminin')
plt.xlabel('Sex', weight = "bold", color = "#000000", fontsize = 14, labelpad = 20)
plt.ylabel('Numar', weight = "bold", color = "#000000", fontsize = 14, labelpad = 20)
plt.legend(labels = ['Masculin','Feminin'], loc = "best")
fig = plt.gcf()
fig.canvas.manager.set_window_title('Sex')
plt.show()

#Persoanele care au anemie sau nu
anaemia_count=heart_failure_data['anaemia'].value_counts()
plt.figure(figsize = (6, 6))
anaemia_count.plot(kind = 'pie', fontsize = 12,style='_classic_test_patch', explode = explode, autopct = '%.1f%%')
plt.title('Anemie sau nu')
plt.xlabel('Anemie', weight = "bold", color = "#000000", fontsize = 14, labelpad = 20)
plt.ylabel('Numar', weight = "bold", color = "#000000", fontsize = 14, labelpad = 20)
plt.legend(labels = ['Fara anemie','Cu anemie'], loc = "best")
fig = plt.gcf()
fig.canvas.manager.set_window_title('Anemie')
plt.show()

#Fumat Femei vs Barbati
most_sex_smoking=heart_failure_data['sex'][heart_failure_data['smoking']==1].value_counts().head()
plt.figure(figsize = (6, 6))
sex_count.plot(kind = 'pie', fontsize = 12,style='classic', explode = explode, autopct = '%.1f%%')
plt.title('Masculin sau feminin: fumeaza')
plt.xlabel('Sex', weight = "bold", color = "#000000", fontsize = 14, labelpad = 20)
plt.ylabel('Numar_fumatori', weight = "bold", color = "#000000", fontsize = 14, labelpad = 20)
plt.legend(labels = ['Masculin','Feminin'], loc = "best")
fig = plt.gcf()
fig.canvas.manager.set_window_title('Fumat/Sex')
plt.show()

#Varstele si numarul oamenilor cu diabet
most_age_have_diabetes=heart_failure_data['age'][heart_failure_data['diabetes']==1].value_counts().head()
plt.figure(figsize = (6, 6))
counts=most_age_have_diabetes
explode = (0,0,0,0,0.09)
counts.plot(kind = 'pie', fontsize = 12,style='_classic_test_patch', explode = explode, autopct = '%.1f%%')
plt.title('Diabetul regasit la urmatoarele varste')
plt.xlabel('Varsta', weight = "bold", color = "#000000", fontsize = 14, labelpad = 20)
plt.ylabel('Numar_diabetici', weight = "bold", color = "#000000", fontsize = 14, labelpad = 20)
plt.legend(labels = counts.index, loc = "center")
fig = plt.gcf()
fig.canvas.manager.set_window_title('Diabet')
plt.show()

#Varstele si numarul oamenilor cu hipertensiune arteriala
most_age_have_highbloodpressure=heart_failure_data['age'][heart_failure_data['high_blood_pressure']==1].value_counts().head()
plt.figure(figsize = (6, 6))
counts=most_age_have_highbloodpressure
explode = (0,0,0,0,0.09)
counts.plot(kind = 'pie', fontsize = 12,style='_classic_test_patch', explode = explode, autopct = '%.1f%%')
plt.title('Hipertensiune arteriala regasita la urmatoarele varste')
plt.xlabel('Varsta', weight = "bold", color = "#000000", fontsize = 14, labelpad = 20)
plt.ylabel('Numar_hipertensivi', weight = "bold", color = "#000000", fontsize = 14, labelpad = 20)
plt.legend(labels = counts.index, loc = "center")
fig = plt.gcf()
fig.canvas.manager.set_window_title('Hipertensiune arteriala')
plt.show()

selected_columns = ['age', 'sex', 'diabetes', 'smoking', 'anaemia', 'ejection_fraction', 'high_blood_pressure', 'serum_creatinine', 'serum_sodium']
x=heart_failure_data[selected_columns]
y=heart_failure_data['DEATH_EVENT']
scaler=StandardScaler()
x=scaler.fit_transform(x)
X_train,X_test,y_train,y_test=train_test_split(x,y,test_size=0.2,shuffle=True,random_state=42)

lg=LogisticRegression()
lg.fit(X_train,y_train)
print("Scor:", lg.score(X_train,y_train))
y_pred=lg.predict(X_test)
print("Acuratete logistic regression:", accuracy_score(y_test,y_pred))

Dt=DecisionTreeClassifier()
Dt.fit(X_train,y_train)
print("Scor:", Dt.score(X_train,y_train))
y_pred=Dt.predict(X_test)
print("Acuratete decision tree:", accuracy_score(y_test,y_pred))

cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(9,6))
sns.heatmap(cm, annot=True, cmap="Blues")
plt.xlabel('Predictii')
plt.ylabel('Adevarate')
fig = plt.gcf()
fig.canvas.manager.set_window_title('Matrice de confuzie')
plt.show()

Rf=RandomForestClassifier()
Rf.fit(X_train,y_train)
print("Scor:", Rf.score(X_train,y_train))
y_pred=Rf.predict(X_test)
print("Acuratete random forest:", accuracy_score(y_test,y_pred))

knn = KNeighborsClassifier(5)
knn.fit(X_train,y_train)
print("Scor:", knn.score(X_train,y_train))
y_pred=knn.predict(X_test)
print("Acuratete K-nearest neighborhood:", accuracy_score(y_test,y_pred))